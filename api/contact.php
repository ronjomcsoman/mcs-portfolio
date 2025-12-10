<?php
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load configuration
require_once __DIR__ . '/config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Rate Limiting
if (RATE_LIMIT_ENABLED) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $rate_limit_key = 'rate_limit_' . $ip;
    $block_key = 'blocked_' . $ip;
    
    // Check if IP is blocked
    if (isset($_SESSION[$block_key])) {
        $block_until = $_SESSION[$block_key];
        if (time() < $block_until) {
            $remaining = $block_until - time();
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => "Too many requests. Please try again in " . ceil($remaining / 60) . " minutes."
            ]);
            exit;
        } else {
            // Unblock after duration
            unset($_SESSION[$block_key]);
            unset($_SESSION[$rate_limit_key]);
        }
    }
    
    // Check rate limit
    if (!isset($_SESSION[$rate_limit_key])) {
        $_SESSION[$rate_limit_key] = [
            'count' => 0,
            'reset_time' => time() + RATE_LIMIT_TIME_WINDOW
        ];
    }
    
    $rate_data = $_SESSION[$rate_limit_key];
    
    // Reset if time window expired
    if (time() > $rate_data['reset_time']) {
        $_SESSION[$rate_limit_key] = [
            'count' => 0,
            'reset_time' => time() + RATE_LIMIT_TIME_WINDOW
        ];
        $rate_data = $_SESSION[$rate_limit_key];
    }
    
    // Check if limit exceeded
    if ($rate_data['count'] >= RATE_LIMIT_MAX_ATTEMPTS) {
        $_SESSION[$block_key] = time() + RATE_LIMIT_BLOCK_DURATION;
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => "Rate limit exceeded. Please try again later."
        ]);
        exit;
    }
    
    // Increment counter
    $_SESSION[$rate_limit_key]['count']++;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Honeypot check (bot detection)
if (isset($input['website']) && !empty($input['website'])) {
    // Bot detected - silently fail
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Thank you for your message!']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit;
    }
}

// Validate reCAPTCHA
if (RECAPTCHA_ENABLED) {
    if (empty($input['recaptcha_token'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please complete the CAPTCHA verification']);
        exit;
    }
    
    $recaptcha_response = $input['recaptcha_token'];
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_data = [
        'secret' => RECAPTCHA_SECRET_KEY,
        'response' => $recaptcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $recaptcha_options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptcha_data)
        ]
    ];
    
    $recaptcha_context = stream_context_create($recaptcha_options);
    $recaptcha_result = file_get_contents($recaptcha_url, false, $recaptcha_context);
    $recaptcha_json = json_decode($recaptcha_result, true);
    
    if (!$recaptcha_json['success']) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'CAPTCHA verification failed. Please try again.']);
        exit;
    }
}

// Sanitize input
$name = htmlspecialchars(strip_tags(trim($input['name'])), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? htmlspecialchars(strip_tags(trim($input['phone'])), ENT_QUOTES, 'UTF-8') : '';
$company = isset($input['company']) ? htmlspecialchars(strip_tags(trim($input['company'])), ENT_QUOTES, 'UTF-8') : '';
$message = htmlspecialchars(strip_tags(trim($input['message'])), ENT_QUOTES, 'UTF-8');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Email configuration
$to = RECIPIENT_EMAIL;
$subject = 'New Contact Form Submission from MCS Website';

// HTML Email body
$email_body = "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>";
$email_body .= "<h2 style='color: #8B6F47;'>New Contact Form Submission from MCS Website</h2>";
$email_body .= "<table style='width: 100%; border-collapse: collapse;'>";
$email_body .= "<tr><td style='padding: 8px; background-color: #f5f5f5; font-weight: bold; width: 150px;'>Name:</td><td style='padding: 8px;'>$name</td></tr>";
$email_body .= "<tr><td style='padding: 8px; background-color: #f5f5f5; font-weight: bold;'>Email:</td><td style='padding: 8px;'><a href='mailto:$email'>$email</a></td></tr>";
$email_body .= "<tr><td style='padding: 8px; background-color: #f5f5f5; font-weight: bold;'>Phone:</td><td style='padding: 8px;'>" . ($phone ? $phone : 'Not provided') . "</td></tr>";
$email_body .= "<tr><td style='padding: 8px; background-color: #f5f5f5; font-weight: bold;'>Company:</td><td style='padding: 8px;'>" . ($company ? $company : 'Not provided') . "</td></tr>";
$email_body .= "</table>";
$email_body .= "<h3 style='color: #8B6F47; margin-top: 20px;'>Message:</h3>";
$email_body .= "<p style='background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37;'>" . nl2br($message) . "</p>";
$email_body .= "<hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>";
$email_body .= "<p style='font-size: 12px; color: #666;'>This email was sent from the MCS website contact form.</p>";
$email_body .= "<p style='font-size: 12px; color: #666;'>IP Address: " . $_SERVER['REMOTE_ADDR'] . "</p>";
$email_body .= "</body></html>";

// Plain text version
$email_body_text = "New contact form submission from MCS Website\n\n";
$email_body_text .= "Name: $name\n";
$email_body_text .= "Email: $email\n";
$email_body_text .= "Phone: " . ($phone ? $phone : 'Not provided') . "\n";
$email_body_text .= "Company: " . ($company ? $company : 'Not provided') . "\n\n";
$email_body_text .= "Message:\n$message\n\n";
$email_body_text .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Send email using SMTP or PHP mail()
if (SMTP_ENABLED) {
    // Using PHPMailer for SMTP
    // Make sure PHPMailer is included (see config.php for instructions)
    
    // If using Composer autoload:
    // use PHPMailer\PHPMailer\PHPMailer;
    // use PHPMailer\PHPMailer\Exception;
    
    // For manual include, uncomment and adjust paths:
    /*
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;
    
    require_once __DIR__ . '/../vendor/autoload.php';
    // OR if manual install:
    // require_once __DIR__ . '/../PHPMailer/src/Exception.php';
    // require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
    // require_once __DIR__ . '/../PHPMailer/src/SMTP.php';
    
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';
        
        // Recipients
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $email_body;
        $mail->AltBody = $email_body_text;
        
        $mail->send();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } catch (Exception $e) {
        error_log("PHPMailer Error: " . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'There was an error sending your message. Please try again.'
        ]);
    }
    */
    
    // Fallback to PHP mail() if PHPMailer not configured
    // Remove this section once PHPMailer is set up
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    if (mail($to, $subject, $email_body, $headers)) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'There was an error sending your message. Please try again.'
        ]);
    }
} else {
    // Using PHP mail() function
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    if (mail($to, $subject, $email_body, $headers)) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'There was an error sending your message. Please try again.'
        ]);
    }
}
?>
