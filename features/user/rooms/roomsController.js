import roomRepo from "./roomsRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";
import hotelRepo from "../hotel/hotelRepository.js";

export default class roomController {
    constructor() {
        this.roomRepo = new roomRepo();
        this.hotelRepo = new hotelRepo();
    }

    // =========================================================
    // GET ALL ROOMS
    // Admin -> show rooms belonging to admin's hotels
    // Guest -> show available rooms
    // =========================================================

    async getAllRoom(req, res, next) {
        try {
            // =========================
            // ADMIN
            // =========================

            if (req.role === "Admin") {
                const hotels =
                    await this.hotelRepo.getAllHotels(req.userId);

                if (!hotels || hotels.length === 0) {
                    return res.status(404).send("Hotel not found");
                }

                const hotelIds =
                    hotels.map(hotel => hotel._id);

                let rooms = [];

                for (const hotelId of hotelIds) {
                    const hotelRooms =
                        await this.roomRepo.getRoomsByHotelId(hotelId);

                    rooms = rooms.concat(hotelRooms);
                }

                return res.render("adminRoom", {
                    title: "Room Page",
                    rooms,
                    hotels,
                    errors: [],
                    oldData: {}
                });
            }

            // =========================
            // GUEST
            // =========================

            const rooms =
                await this.roomRepo.filterRooms({
                    onlyAvailable: true
                });

            return res.render("room", {
                title: "Room Page",
                rooms,
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // ADD ROOM PAGE
    // Admin only
    // =========================================================

    async addRoomPage(req, res, next) {
        try {
            const userId = req.userId;

            // Get only hotels created by logged-in admin
            const hotels =
                await this.hotelRepo.getAllHotels(userId);

            return res.render("addRoom", {
                title: "Add Room Page",
                hotels,
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // ADD ROOM
    // Admin only
    // =========================================================

    async addRoom(req, res, next) {
        try {
            // =========================
            // VALIDATION ERROR
            // =========================

            if (req.validationErrors) {
                const hotels =
                    await this.hotelRepo.getAllHotels(req.userId);

                return res.status(400).render("addRoom", {
                    title: "Add Room Page",
                    hotels,
                    errors: req.validationErrors,
                    oldData: req.body
                });
            }

            const {
                hotelId,
                roomNumber,
                roomType,
                floor,
                maxGuests,
                bedType,
                bedCount,
                pricePerNight,
                size,
                amenities,
                status,
                description,
                isSmokingAllowed,
                hasBalcony,
                hasAC
            } = req.body;

            // =========================
            // CHECK HOTEL
            // =========================

            const hotels =
                await this.hotelRepo.getAllHotels(req.userId);

            const hotel = hotels.find(
                hotel => hotel._id.toString() === hotelId
            );

            if (!hotel) {
                return res.status(404).send(
                    "Hotel not found or you are not authorized to add a room to this hotel"
                );
            }

            // =========================
            // IMAGE
            // =========================

            const image = req.file
                ? req.file.filename
                : "default.png";

            // =========================
            // ROOM DATA
            // =========================

            const roomData = {
                hotelId,
                roomNumber,
                roomType,
                floor,
                maxGuests,
                bedType,
                bedCount,
                pricePerNight,
                size,
                amenities,
                images: [image],
                status,
                description,
                isSmokingAllowed:
                    isSmokingAllowed === "true",
                hasBalcony:
                    hasBalcony === "true",
                hasAC:
                    hasAC === "true"
            };

            await this.roomRepo.addRoom(roomData);

            logger.info(
                `Room added successfully by user ${req.userId}`
            );

            return res.redirect("/api/rooms");
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // EDIT ROOM PAGE
    // Admin only
    // =========================================================

    async editPage(req, res, next) {
        try {
            const { id } = req.params;

            const room =
                await this.roomRepo.getRoomById(id);

            if (!room) {
                logger.warn(`Room not found: ${id}`);

                return res.status(404).send(
                    "Room not found!"
                );
            }

            return res.render("editRoom", {
                title: "Edit Room Page",
                room,
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // EDIT ROOM
    // Admin only
    // =========================================================

    async edit(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;

            const room =
                await this.roomRepo.getRoomById(id);

            if (!room) {
                return res.status(404).send(
                    "Room not found"
                );
            }

            // If image is uploaded
            if (req.file) {
                data.images = [req.file.filename];
            }

            // Convert checkbox values
            if (data.isSmokingAllowed !== undefined) {
                data.isSmokingAllowed =
                    data.isSmokingAllowed === "true";
            }

            if (data.hasBalcony !== undefined) {
                data.hasBalcony =
                    data.hasBalcony === "true";
            }

            if (data.hasAC !== undefined) {
                data.hasAC =
                    data.hasAC === "true";
            }

            await this.roomRepo.updateRoom(id, data);

            logger.info(
                `Room updated successfully: ${id}`
            );

            return res.redirect("/api/rooms");
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // FILTER ROOMS
    // Admin -> filter admin's rooms
    // Guest -> filter available rooms
    // =========================================================

    async filterRooms(req, res, next) {
        try {
            const {
                hotelId,
                status,
                roomType,
                roomNumber,
                guests
            } = req.query;

            // =========================
            // ADMIN
            // =========================

            if (req.role === "Admin") {
                const hotels =
                    await this.hotelRepo.getAllHotels(req.userId);

                if (!hotels || hotels.length === 0) {
                    return res.status(404).send(
                        "Hotel not found"
                    );
                }

                const adminHotelIds =
                    hotels.map(hotel => hotel._id.toString());

                let rooms = [];

                // If admin selected a hotel
                if (hotelId) {
                    // Make sure hotel belongs to admin
                    if (!adminHotelIds.includes(hotelId)) {
                        return res.status(403).send(
                            "You are not authorized to access this hotel"
                        );
                    }

                    rooms =
                        await this.roomRepo.filterRooms({
                            hotelId,
                            status,
                            roomType,
                            roomNumber
                        });
                } else {
                    // Get rooms from all admin hotels
                    for (const id of adminHotelIds) {
                        const hotelRooms =
                            await this.roomRepo.filterRooms({
                                hotelId: id,
                                status,
                                roomType,
                                roomNumber
                            });

                        rooms = rooms.concat(hotelRooms);
                    }
                }

                return res.render("adminRoom", {
                    title: "Room Page",
                    rooms,
                    hotels,
                    errors: [],
                    oldData: req.query
                });
            }

            // =========================
            // GUEST
            // =========================

            const rooms =
                await this.roomRepo.filterRooms({
                    guests,
                    roomType,
                    onlyAvailable: true
                });

            return res.render("room", {
                title: "Room Page",
                rooms,
                errors: [],
                oldData: req.query
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // DELETE ROOM
    // Admin only
    // =========================================================

    async deleteRoom(req, res, next) {
        try {
            const { id } = req.params;

            const room =
                await this.roomRepo.getRoomById(id);

            if (!room) {
                logger.warn(
                    `Room not found: ${id}`
                );

                return res.status(404).send(
                    "Room not found"
                );
            }

            await this.roomRepo.deleteRoom(id);

            logger.info(
                `Room deleted successfully: ${id}`
            );

            return res.redirect("/api/rooms");
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // SEARCH ROOM
    // Guest
    // =========================================================

    async searchRoom(req, res, next) {
        try {
            const {
                guests,
                roomType
            } = req.query;

            const rooms =
                await this.roomRepo.filterRooms({
                    guests,
                    roomType,
                    onlyAvailable: true
                });

            return res.render("room", {
                title: "Room Page",
                rooms,
                errors: [],
                oldData: req.query
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // ROOM DETAILS
    // Guest
    // =========================================================

    async roomDetailsPage(req, res, next) {
        try {
            const { id } = req.params;

            const room =
                await this.roomRepo.getRoomById(id);

            if (!room) {
                return res.status(404).render(
                    "roomDetails",
                    {
                        title: "Room Not Found",
                        room: null,
                        errors: [],
                        oldData: {}
                    }
                );
            }

            return res.render("roomDetails", {
                title: `${room.roomType} Room`,
                room,
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // GET ROOMS BY HOTEL ID
    // =========================================================

    async getRoomByHotelId(req, res, next) {
        try {
            const { hotelId } = req.query;

            if (!hotelId) {
                return res.status(400).send(
                    "Hotel ID is required"
                );
            }

            const rooms =
                await this.roomRepo.getRoomsByHotelId(
                    hotelId
                );

            return res.render("room", {
                title: "Available Rooms",
                rooms,
                hotelId,
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }
}