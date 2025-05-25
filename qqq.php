<?php
require 'vendor/autoload.php';

use ApaiIO\Configuration\GenericConfiguration;
use ApaiIO\ApaiIO;
use ApaiIO\Requests\LookupRequest;

header('Content-Type: application/json');

// Get ASIN from query string
$asin = $_GET['asin'] ?? '';

if (!$asin) {
    echo json_encode(['error' => 'Missing ASIN']);
    exit;
}

// Amazon PA API credentials
$conf = new GenericConfiguration();
$conf
    ->setCountry('com') // Change to your region (ex: 'uk', 'de', etc.)
    ->setAccessKey('YOUR_AMAZON_ACCESS_KEY')
    ->setSecretKey('YOUR_AMAZON_SECRET_KEY')
    ->setAssociateTag('yourtag-20') // Your Associate Tag
    ->setRequest('\ApaiIO\Request\Rest\Request')
    ->setResponseTransformer('\ApaiIO\ResponseTransformer\ObjectToArray');

$apaiIO = new ApaiIO($conf);

$request = new LookupRequest();
$request->setItemId($asin);
$request->setResponseGroup(['Images', 'ItemAttributes', 'EditorialReview']);

try {
    $formattedResponse = $apaiIO->runOperation($request);
    echo json_encode($formattedResponse);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
