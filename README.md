# OCR-Scanbot
OCR Implementation 

Issue: performOCR callback not giving result or error

Steps to reproduce bug:
1. Clone project
2. npm Install
3. Open project in Android Studio
4. npm run start
5. Run application on Android device through Android studio manager.

I have used 

 ScanbotSDK.performOCR(sendingOptions, (result) => {
            // Scanbot SDK succesfully initialized
            alert("YUP")
            alert(result)
            console.log("OCR Output");
            console.log(result);
          }, (error) => {
            alert("ERRO");
            console.log("OCR Error");
            console.log(error);
          });
          
  Look up for console values. It comes neither in Result nor in error. 
 
          
