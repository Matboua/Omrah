<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Umrah Booking Confirmation</title>
    <style>
        /* Base Styles */
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f9fafb;
            color: #374151;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Container */
        .container {
            background: #ffffff;
            padding: 48px;
            border-radius: 16px;
            max-width: 640px;
            margin: 40px auto;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
            border: 1px solid #e5e7eb;
        }
        
        /* Header */
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 24px;
            letter-spacing: -0.5px;
        }
        
        h1 {
            color: #111827;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 16px 0;
            line-height: 1.3;
        }
        
        .subheader {
            color: #6b7280;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        /* Content */
        .content {
            margin: 32px 0;
        }
        
        .greeting {
            font-size: 16px;
            margin-bottom: 24px;
        }
        
        .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 32px 0;
        }
        
        /* Booking Card */
        .booking-card {
            background-color: #f8fafc;
            border-radius: 12px;
            padding: 24px;
            margin: 32px 0;
            border: 1px solid #e5e7eb;
        }
        
        .booking-title {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .booking-title svg {
            margin-right: 12px;
            color: #10b981;
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: 120px 1fr;
            gap: 12px;
        }
        
        .detail-label {
            font-weight: 500;
            color: #6b7280;
            font-size: 14px;
        }
        
        .detail-value {
            font-weight: 500;
            color: #111827;
            font-size: 14px;
        }
        
        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            background-color: #d1fae5;
            color: #065f46;
        }
        
        /* CTA Button */
        .cta-container {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-btn {
            display: inline-block;
            padding: 14px 28px;
            background-color: #10b981;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .cta-btn:hover {
            background-color: #059669;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        /* Contact */
        .contact {
            margin-top: 32px;
            font-size: 15px;
            color: #6b7280;
        }
        
        .contact-title {
            font-weight: 500;
            margin-bottom: 12px;
        }
        
        .contact-methods {
            display: flex;
            gap: 16px;
            margin-top: 12px;
        }
        
        .contact-method {
            display: flex;
            align-items: center;
            color: #4b5563;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
        }
        
        .contact-method:hover {
            color: #10b981;
        }
        
        .contact-method svg {
            margin-right: 8px;
            width: 16px;
            height: 16px;
        }
        
        /* Footer */
        .footer {
            font-size: 14px;
            color: #9ca3af;
            margin-top: 48px;
            text-align: center;
            line-height: 1.5;
        }
        
        .footer p {
            margin: 8px 0;
        }
        
        .copyright {
            margin-top: 24px;
            font-size: 13px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="logo">Umrah Booking</div>
        <h1>Your Booking is Confirmed</h1>
        <p class="subheader">We're honored to be part of your spiritual journey</p>
    </div>

    <div class="content">
        <p class="greeting">Dear {{ $booking->user->name }},</p>
        
        <p>Thank you for choosing us for your Umrah pilgrimage. We're pleased to confirm your booking details below.</p>
        
        <div class="divider"></div>
        
        <div class="booking-card">
            <div class="booking-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Booking Summary
            </div>
            
            <div class="detail-grid">
                <span class="detail-label">Package:</span>
                <span class="detail-value">{{ $booking->package->name }}</span>
                
                <span class="detail-label">Class:</span>
                <span class="detail-value">{{ $booking->packageClass->name }}</span>
                
                <span class="detail-label">Price:</span>
                <span class="detail-value">{{ $booking->packageClass->price }} MAD</span>
                
                <span class="detail-label">Departure Date:</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($booking->packageClass->departure_date)->format('F j, Y') }}</span>
                
                <span class="detail-label">Status:</span>
                <span class="status-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    {{ ucfirst($booking->status) }}
                </span>
            </div>
        </div>
        
        <p>We've sent all the necessary documents to your email. Please check your inbox (and spam folder) for your itinerary and payment receipt.</p>
        
        <div class="divider"></div>
        
        <div class="cta-container">
            <a href="{{ url('/my-bookings') }}" class="cta-btn">View Complete Booking Details</a>
        </div>
        
        <div class="contact">
            <p class="contact-title">Need assistance with your booking?</p>
            <p>Our dedicated support team is available to help you with any questions about your pilgrimage.</p>
            
            <div class="contact-methods">
                <a href="tel:+966123456789" class="contact-method">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    +966 12 345 6789
                </a>
                <a href="mailto:support@umrahbooking.com" class="contact-method">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    support@umrahbooking.com
                </a>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Thank you for trusting us with your spiritual journey.</p>
        <p>May your Umrah pilgrimage be accepted and blessed.</p>
        <div class="copyright">© 2025 Umrah Booking. All rights reserved.</div>
    </div>
</div>
</body>
</html>