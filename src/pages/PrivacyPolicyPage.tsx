export default function PrivacyPolicyPage() {
    return (
        <div>
            <h1>Privacy Policy</h1>
            <p>
                This app almost never collects any information at all, all your data is 
                stored locally in your browser, <b><u>but there is an exception:</u></b>
            </p>
            <br/>
            <ul>
                <li>
                    When you use the 'share' feature, your list gets stored in a publicly
                    available file storage called <a href='https://jsonblob.com' target='_blank'>jsonblob.com</a>.
                    This stored file could technically be accessed by anyone, although it would be very
                    difficult because the person would need to know the unique code that was generated
                    for your shared link. The file only gets created once you use the 'share' feature,
                    otherwise no data is stored anywhere but locally on your browser.
                </li>
            </ul>
        </div>
    )
}