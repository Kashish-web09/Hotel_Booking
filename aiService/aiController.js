import { generateHotelDescription } from './aiService.js';

export async function generateDescription(req, res) {

    try {

        const {
            hotelName,
            location,
            facilities
        } = req.body;

        const description = await generateHotelDescription({
            hotelName,
            location,
            facilities
        });

        res.json({
            success: true,
            description
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed to generate description'
        });
    }
}