<?php
require __DIR__ . '/vendor/autoload.php';
session_start();
$provider = new \Wohali\OAuth2\Client\Provider\Discord([
    'clientId' => 'заменить',
    'clientSecret' => 'заменить',
    'redirectUri' => 'заменить',
]);

if (!isset($_GET['code'])) {

    // Step 1. Get authorization code
    $authUrl = $provider->getAuthorizationUrl();
    $_SESSION['oauth2state'] = $provider->getState();
    header('Location: ' . $authUrl);

// Check given state against previously stored one to mitigate CSRF attack
} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

    unset($_SESSION['oauth2state']);
    exit('Invalid state');

} else {

    // Step 2. Get an access token using the provided authorization code
    try {
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code'],
    ]);

    // Show some token details
    /*  echo '<h2>Token details:</h2>';
    echo 'Token: ' . $token->getToken() . "<br/>";
    echo 'Refresh token: ' . $token->getRefreshToken() . "<br/>";
    echo 'Expires: ' . $token->getExpires() . " - ";
    echo ($token->hasExpired() ? 'expired' : 'not expired') . "<br/>";*/

    // Step 3. (Optional) Look up the user's profile with the provided token
    try {
        include_once "inc/safemysql.class.php";
        $db = new SafeMySQL();
        $user = $provider->getResourceOwner($token)->toArray();
        $userrow = $db->getRow('SELECT * FROM users WHERE duserid = ?s LIMIT 1', $user['id']);
        if ($userrow != null) {
            $userid = intval($userrow["id"]);
            if ($userid > 0) {
                $db->query("UPDATE users SET namevar=?s WHERE duserid=?s", $user["username"], $user['id']);
                $_SESSION["userid"] = $userid;
//echo("OK");
                header('Location: /sworkparse/index.php');
                die();
            } else {
                echo ("WRONG USER");
            }
            /* echo '<h2>Resource owner details:</h2>';
        printf('Hello %s#%s!<br/><br/>', $user->getUsername(), $user->getDiscriminator());
        var_export($user->toArray());*/
        }
    } catch (Exception $e) {

        // Failed to get user details
        exit('Error:'.$e);

    }
} catch (Exception $e) {

    // Failed to get user details
    exit('Error:'.$e);

}

}
