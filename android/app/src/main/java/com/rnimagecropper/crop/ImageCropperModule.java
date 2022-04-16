package com.rnimagecropper.crop;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.util.Objects;

public class ImageCropperModule extends ReactContextBaseJavaModule {
    private Promise promise;
    private ReactApplicationContext context;
    private int EDIT_SUCCESSFUL = 1;
    private Activity activity;


    public ImageCropperModule(ReactApplicationContext context){
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "MyImageCrop";
    }

    @ReactMethod
    public void startCrop(ReadableMap options, Promise promise){
        this.promise = promise;
        if (this.context == null) {
            promise.reject("Context_DOES_NOT_EXIST", "Context doesn't exist");
            return;
        }
        this.activity = this.getCurrentActivity();
        if (this.context == null) {
            promise.reject("ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist");
            return;
        }
        Intent intent = new Intent(this.context,ImageCropActivity.class);
        this.context.addActivityEventListener(mActivityEventListener);
        String path = options.getString("path");
        Log.d("JetPath:",path);
        intent.putExtra("path",path);
//        this.activity.startActivityForResult(intent,EDIT_SUCCESSFUL);

        // the first method to start crop activity
//        CropImage.activity(Uri.fromFile(new File(path)))
//          .start(this.activity);
        // the second method to start a view on a custom activity

        this.activity.startActivityForResult(intent,EDIT_SUCCESSFUL);

    }

    private ActivityEventListener mActivityEventListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == EDIT_SUCCESSFUL) {
                String path = data.getStringExtra("path");
                if(path == null){
                    path = "";
                }
                if(Activity.RESULT_OK == resultCode){
                    promise.resolve("file://" + path);
                } else if(Activity.RESULT_CANCELED == resultCode){
                    promise.reject("USER_CANCELLED", "User has cancelled");
                } else if(2 == resultCode){
                    promise.reject("LOAD_IMAGE_FAILED", "Load image failed: " + path);
                }
            }
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    };
}
