# IosShareSheet [rule] v1.0.0
> Use the iOS system share sheet — ShareLink in SwiftUI or UIActivityViewController in UIKit — for sharing content rather than custom share UIs.
domain: frontend-design

## Applies To
any iOS app containing content users might share (links, images, text, files, locations)

## Examples
- SwiftUI: ShareLink(item: url, subject: Text('Check this out'), message: Text(article.title)).
- UIKit: UIActivityViewController(activityItems: [url], applicationActivities: nil); present modally.
- Verify: trigger sharing; standard iOS share sheet must appear with the full roster of system apps and extensions.

## Rationale
The system share sheet gives users access to all their installed apps and extensions (Messages, Mail, AirDrop, third-party apps). Custom share UIs limit options to a hard-coded list and break user expectations of how sharing works on iOS.

## Applies To
any iOS app containing content users might share (links, images, text, files, locations)
