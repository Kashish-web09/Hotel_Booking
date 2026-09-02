import brevo from "./emailConfig.js";


// ==================== COMMON SEND EMAIL ====================

import brevo from "./emailConfig.js";

const sendEmail = async ({ to, subject, html }) => {
    try {

        const info = await brevo.transactionalEmails.sendTransacEmail({

            sender: {
                email: process.env.BREVO_EMAIL,
                name: "Hotel BradMate"
            },

            to: [
                {
                    email: to
                }
            ],

            subject,

            htmlContent: html
        });

        console.log(`Email sent successfully to ${to}`);
        console.log("Brevo response:", info);

        return info;

    } catch (error) {

        console.error(
            `Failed to send email to ${to}:`,
            error.message
        );

        throw error;
    }
};


// ==================== USER REGISTER ====================

export const userRegister = async (userEmail, userName) => {

    return sendEmail({

        to: userEmail,

        subject: "Welcome to Hotel BradMate",

        html: `
            <h2>Welcome to Hotel BradMate, ${userName}!</h2>

            <p>
                Thank you for creating an account with us.
            </p>

            <p>
                Your account has been successfully created.
                You can now explore our rooms and make bookings.
            </p>

            <p>
                We look forward to serving you.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `
    });
};


// ==================== ADMIN USER REGISTER ====================

export const adminUserRegister = async (adminEmail, userName) => {

    return sendEmail({

        to: adminEmail,

        subject: "New User Registered",

        html: `
            <h2>New User Registration</h2>

            <p>
                A new user has registered on Hotel BradMate.
            </p>

            <p>
                <strong>User Name:</strong> ${userName}
            </p>

            <p>
                Please check the admin dashboard for more details.
            </p>

            <br>

            <p>
                <strong>Hotel BradMate Team</strong>
            </p>
        `
    });
};


// ==================== BOOKING CONFIRMATION ====================

export const bookingConfirmation = async (
    userEmail,
    userName,
    hotel,
    bookingId
) => {

    console.log("CONFIRMATION EMAIL FUNCTION CALLED");
    console.log("EMAIL:", userEmail);

    return sendEmail({

        to: userEmail,

        subject: "Booking Confirmation - Hotel BradMate",

        html: `
            <h2>Booking Confirmed 🎉</h2>

            <p>
                Hello ${userName},
            </p>

            <p>
                Your booking for
                <strong>${hotel.name}</strong>
                has been successfully confirmed.
            </p>

            <p>
                <strong>Booking ID:</strong> ${bookingId}
            </p>

            <p>
                Thank you for choosing Hotel BradMate.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `
    });
};


// ==================== BOOKING STATUS ====================

export const bookingStatus = async (
    userEmail,
    userName,
    bookingId,
    status
) => {

    let subject;
    let html;


    // ==================== COMPLETED ====================

    if (status === "Completed") {

        subject = "Thank You for Staying with Hotel BradMate";

        html = `
            <h2>Thank You for Staying with Us! 🎉</h2>

            <p>
                Hello ${userName},
            </p>

            <p>
                Thank you for choosing
                <strong>Hotel BradMate</strong>
                for your stay.
            </p>

            <p>
                We hope you had a comfortable and enjoyable
                experience with us.
            </p>

            <p>
                <strong>Booking ID:</strong> ${bookingId}
            </p>

            <p>
                It was our pleasure to have you as our guest,
                and we hope to welcome you again in the future.
            </p>

            <p>
                We would love to hear about your experience.
                Your feedback helps us improve our services.
            </p>

            <br>

            <p>
                Thank you once again for staying with us.
            </p>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `;

    }


    // ==================== CANCELLED ====================

    else if (status === "Cancelled") {

        subject = "We're Sorry About Your Booking - Hotel BradMate";

        html = `
            <h2>We're Sorry About Your Booking</h2>

            <p>
                Hello ${userName},
            </p>

            <p>
                We're sorry to inform you that your booking
                has been <strong>cancelled</strong>.
            </p>

            <p>
                <strong>Booking ID:</strong> ${bookingId}
            </p>

            <p>
                We sincerely apologize for any inconvenience
                this may have caused you.
            </p>

            <p>
                We hope to have the opportunity to welcome you
                to <strong>Hotel BradMate</strong> in the future.
            </p>

            <p>
                If you have any questions regarding this
                cancellation, please contact our support team.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `;

    }


    // ==================== OTHER STATUS ====================

    else {

        subject = "Booking Status Update - Hotel BradMate";

        html = `
            <h2>Booking Status Update</h2>

            <p>
                Hello ${userName},
            </p>

            <p>
                Your booking status has been updated to
                <strong>${status}</strong>.
            </p>

            <p>
                <strong>Booking ID:</strong> ${bookingId}
            </p>

            <p>
                If you have any questions, please contact
                our support team.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `;
    }


    return sendEmail({

        to: userEmail,

        subject,

        html
    });
};


// ==================== PROFILE UPDATE ====================

export const profileUpdate = async (
    userEmail,
    userName
) => {

    return sendEmail({

        to: userEmail,

        subject: "Profile Updated Successfully",

        html: `
            <h2>Profile Updated Successfully</h2>

            <p>
                Hello ${userName},
            </p>

            <p>
                Your Hotel BradMate profile has been
                successfully updated.
            </p>

            <p>
                If you did not make this change, please
                contact our support team immediately.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `
    });
};


// ==================== FEEDBACK SENT ====================

export const feedbackSent = async (
    adminEmail,
    userName
) => {

    return sendEmail({

        to: adminEmail,

        subject: "New Feedback Received",

        html: `
            <h2>New Feedback Received</h2>

            <p>
                A new feedback has been submitted by
                <strong>${userName}</strong>.
            </p>

            <p>
                Please check the admin dashboard to
                review the feedback.
            </p>

            <br>

            <p>
                <strong>Hotel BradMate Team</strong>
            </p>
        `
    });
};


// ==================== FEEDBACK STATUS ====================

export const feedbackUpdate = async (
    userEmail,
    userName,
    status,
    message
) => {

    return sendEmail({

        to: userEmail,

        subject: "Feedback Status Update - Hotel BradMate",

        html: `
            <h2>Feedback Status Update</h2>

            <p>
                Hello ${userName},
            </p>

            <p>
                Thank you for contacting
                <strong>Hotel BradMate</strong>.
            </p>

            <p>
                Your feedback status has been updated.
            </p>

            <p>
                <strong>Status:</strong> ${status}
            </p>

            ${
                message
                    ? `
                        <p>
                            <strong>
                                Message from Hotel BradMate:
                            </strong>
                        </p>

                        <p>
                            ${message}
                        </p>
                    `
                    : ""
            }

            <p>
                If you have any questions, please contact
                our support team.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `
    });
};


// ==================== PASSWORD RESET ====================

export const resetLinkSent = async (
    userEmail,
    userName,
    resetUrl
) => {

    return sendEmail({

        to: userEmail,

        subject: "Reset Your Password - Hotel BradMate",

        html: `
            <h2>Password Reset Request</h2>

            <p>
                Hello ${userName},
            </p>

            <p>
                We received a request to reset your password
                for your <strong>Hotel BradMate</strong> account.
            </p>

            <p>
                Click the button below to create a new password:
            </p>

            <div style="margin: 25px 0;">

                <a
                    href="${resetUrl}"
                    style="
                        background-color: #212529;
                        color: white;
                        padding: 12px 20px;
                        text-decoration: none;
                        border-radius: 6px;
                        display: inline-block;
                    "
                >
                    Reset Password
                </a>

            </div>

            <p>
                This link will expire after a limited time.
            </p>

            <p>
                If you did not request a password reset,
                you can safely ignore this email.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>Hotel BradMate Team</strong>
            </p>
        `
    });
};


// ==================== CANCEL BOOKING ====================

export const cancelBooking = async (
    userEmail,
    bookingId,
    refundAmount,
    paymentMethod
) => {

    console.log("CANCEL EMAIL FUNCTION CALLED");
    console.log("EMAIL:", userEmail);
    console.log("BOOKING:", bookingId);
    console.log("AMOUNT:", refundAmount);
    console.log("PAYMENT METHOD:", paymentMethod);


    const isCash = paymentMethod === "Cash";


    return sendEmail({

        to: userEmail,

        subject: isCash
            ? "Hotel Booking Cancelled - Hotel BradMate"
            : "Hotel Booking Cancelled & Refund Initiated - Hotel BradMate",

        html: isCash

            ? `
                <h2>Booking Cancelled</h2>

                <p>
                    Hello,
                </p>

                <p>
                    Your hotel booking has been cancelled
                    successfully.
                </p>

                <p>
                    <strong>Booking ID:</strong> ${bookingId}
                </p>

                <p>
                    <strong>Payment Method:</strong>
                    Pay at Hotel
                </p>

                <p>
                    No refund is applicable because no online
                    payment was made.
                </p>

                <p>
                    Thank you for choosing
                    <strong>Hotel BradMate</strong>.
                </p>

                <br>

                <p>
                    Regards,<br>
                    <strong>Hotel BradMate Team</strong>
                </p>
            `

            : `
                <h2>Booking Cancelled & Refund Initiated</h2>

                <p>
                    Hello,
                </p>

                <p>
                    Your hotel booking has been cancelled
                    successfully.
                </p>

                <p>
                    <strong>Booking ID:</strong> ${bookingId}
                </p>

                <p>
                    <strong>Payment Method:</strong>
                    ${paymentMethod}
                </p>

                <p>
                    <strong>Refund Amount:</strong>
                    ₹${refundAmount}
                </p>

                <p>
                    Your refund has been initiated and will
                    be credited back to your original
                    payment method.
                </p>

                <p>
                    Thank you for choosing
                    <strong>Hotel BradMate</strong>.
                </p>

                <br>

                <p>
                    Regards,<br>
                    <strong>Hotel BradMate Team</strong>
                </p>
            `
    });
};
