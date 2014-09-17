## Step 3: Develop

### Tools Overview

#### [Chrome App Developer Tool for Mobile (CADT)](https://github.com/MobileChromeApps/chrome-app-developer-tool/)

CADT is an app for your mobile development device that makes it quick and easy to see your code in action. It provides the Cordova framework of Chrome Apps for Mobile so you can test your code by simply pushing your Chrome App assets to your mobile device (made easy with our tools), which is must faster than packaging up the entire mobile app.

CADT integrates with both Chrome Dev Editor and `cca` to bring you __live deploy__, allowing you to instantly preview the Chrome App you're editing, running right on your Android or iOS device. When you make a change to the code in your editor, you'll see it straight away on your device.

#### [The `cca` Command-Line Tool](https://github.com/MobileChromeApps/mobile-chrome-apps)

`cca` provides all the functionality you need to develop and package Chrome Apps for Mobile from the command line. Use it with CADT to rapidly iterate on your code: live deploy allows you to instantly see your Chrome App running on a connected mobile device. When you are ready to publish your Chrome App for Mobile to the Apple App Store and Google Play Store, use `cca` to bundle up your Chrome App into the proper mobile packages.

#### [Chrome Dev Editor (CDE)](https://github.com/dart-lang/chromedeveditor)

CDE is an IDE built specifically for Chrome Apps. Use it with CADT for live deploy.

### Development

There are three different workflows that you can use to run your application:

* **Option A**: Live deploy -- use CADT on your mobile device with CDE or `cca` on your development computer
* **Option B**: Use `cca` to package your application and deploy it to your mobile device
* **Option C**: Use a third party IDE, such as Eclipse or Xcode. The use of a third party IDE is entirely optional (but often useful) to assist with launching, configuring, and debugging your hybrid mobile application.

### Option A: Live deploy --- use CADT with CDE or `cca`

1. Follow these [instructions](https://github.com/MobileChromeApps/chrome-app-developer-tool/) to install CADT.

2. Enjoy live deploy! First, run CADT on your mobile device. Then:

  * **`cca`:** Navigate to your Chrome App's directory and deploy:
  	* IP deploy: `cca push --target=IP_ADDRESS`	
  	* USB deploy:
  		* **Android:** To setup, use `adb forward tcp:2424 tcp:2424`
  		* **iOS:** To setup, obtain [tcprelay.py](https://github.com/chid/tcprelay) and use `adb tcprelay.py 2424:2424`
  		* Use `cca push`
  	* Use `cca push [--target=IP_ADDRESS] --watch` to automatically refresh the Chrome App when the code is updated.

### Option B: Develop and build using the command line

From the root of your `cca`-generated project directory:

#### Android
* To run your app on the Android Emulator: `cca emulate android`
  * Note: This requires that you've set up an emulator. You can run `android avd` to set this up. Download additional emulator images by running `android`. To make the intel images run faster, install [Intel's HAXM](http://software.intel.com/en-us/articles/intel-hardware-accelerated-execution-manager/).
* To run your app on a connected ARM Android device: `cca run android`. To run on an Intel X86 Android device: `DEPLOY_APK_ARCH=x86 cca run android`

#### iOS
* To run your app on the iOS Simulator: `cca emulate ios`
* To run your app on a connected iOS device: `cca run ios`
  * Note: This requires that you've set up a [Provisioning Profile](http://stackoverflow.com/questions/3362652/what-is-a-provisioning-profile-used-for-when-developing-iphone-applications) for your device.

### Option C: Develop and build using an IDE

#### Android

1. In Eclipse, select `File` -> `Import`.
2. Choose `Android` > `Existing Android Code Into Workspace`.
3. Import from the `platforms/android` folder that was created within your project.
    * It is expected to have multiple projects to import.
    * If you see `xwalk_core_library` listed twice, then you probably accidentally imported from the root of the project.
4. Click the Play button to run your app.
  * You will need to create a Run Configuration (as with all Java applications).  You _usually_ get prompted for this the first time automatically.
  * You will need to manage your devices/emulators the first time as well.

#### iOS

1.  Open the project in Xcode by typing the following in a terminal window:

        cd YourApp
        open platforms/ios/*.xcodeproj


2.  Make sure you are building the right target.

    In the top left (beside Run and Stop buttons), there is a dropdown to select target project and device. Ensure that `YourApp` is selected and not `CordovaLib`.

3.  Click the Play button.

### Making changes to your app source code

Your HTML, CSS, and JavaScript files live within the `www` directory of your cca project folder.

**Important**: After making changes to `www/`, you must run `cca prepare` before deploying your application.  If you are running `cca build`, `cca run`, or `cca emulate` from the command line, the prepare step is done automatically.  If you are developing using Eclipse/XCode, you must run `cca prepare` manually.

### Debugging

You can debug your Chrome App on mobile the same way that you [debug Cordova applications](https://github.com/phonegap/phonegap/wiki/Debugging-in-PhoneGap).

**Important**: In order to use [remote debugging with chrome web inspector for Android](https://developer.chrome.com/devtools/docs/remote-debugging), your desktop Chrome version should match the Chrome WebView on Android.  In practice, this usually means you should be debugging using Chrome Dev/Canary.  (If there is a version mismatch, usually the chrome web inspector window appears completely blank.)

_**Done? Continue to [Step 4: Next Steps &raquo;](NextSteps.md)**_
