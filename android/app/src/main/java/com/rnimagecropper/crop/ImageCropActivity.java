package com.rnimagecropper.crop;

import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.rnimagecropper.R;

import java.io.File;
import java.io.IOException;

public class ImageCropActivity extends AppCompatActivity implements CropImageView.OnSetImageUriCompleteListener,
        CropImageView.OnCropImageCompleteListener {
    private CropImageView mCropImageView;
    private CropImageOptions mOptions;
    private Uri mCropImageUri;
    private ImageView mIvRetake;
    private ImageView mIvTakePhoto;
    private ImageView mIvRotate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_crop);
        mCropImageView = findViewById(R.id.cropImageView);

        mIvRetake = findViewById(R.id.iv_btn_retake);
        mIvTakePhoto = findViewById(R.id.iv_take_photo);
        mIvRotate = findViewById(R.id.iv_btn_rotate);
        mIvRetake.setOnClickListener(view -> {

        });
        mIvTakePhoto.setOnClickListener(view -> {
            cropImage();
        });
        mIvRotate.setOnClickListener(view -> {
            rotateImage(90);
        });

        Bundle bundle = getIntent().getBundleExtra(CropImage.CROP_IMAGE_EXTRA_BUNDLE);
        String path = getIntent().getStringExtra("path");
        mCropImageUri = Uri.fromFile(new File(path));
        initCropImageParams();
//        mOptions = bundle.getParcelable(CropImage.CROP_IMAGE_EXTRA_OPTIONS);
        mOptions = new CropImageOptions();
        mOptions.backgroundColor = Color.argb(119, 255, 255, 255);
        mCropImageView.setOnSetImageUriCompleteListener(this);
        mCropImageView.setOnCropImageCompleteListener(this);
    }

    private void initCropImageParams(){
        if (mCropImageUri == null || mCropImageUri.equals(Uri.EMPTY)) {
            if (CropImage.isExplicitCameraPermissionRequired(this)) {
                // request permissions and handle the result in onRequestPermissionsResult()
                requestPermissions(
                        new String[] {Manifest.permission.CAMERA},
                        CropImage.CAMERA_CAPTURE_PERMISSIONS_REQUEST_CODE);
            } else {
                CropImage.startPickImageActivity(this);
            }
        } else if (CropImage.isReadExternalStoragePermissionsRequired(this, mCropImageUri)) {
            // request permissions and handle the result in onRequestPermissionsResult()
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                requestPermissions(
                        new String[] {Manifest.permission.READ_EXTERNAL_STORAGE},
                        CropImage.PICK_IMAGE_PERMISSIONS_REQUEST_CODE);
            }
        } else {
            // no permissions required or already grunted, can start crop image activity
            mCropImageView.setImageUriAsync(mCropImageUri);
        }
    }

    protected void setResult(Uri uri, Exception error, int sampleSize) {
        int resultCode = error == null ? RESULT_OK : CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE;
        setResult(resultCode, getResultIntent(uri, error, sampleSize));
        finish();
    }

    protected void setResultCancel() {
        setResult(RESULT_CANCELED);
        finish();
    }

    /** Get intent instance to be used for the result of this activity. */
    protected Intent getResultIntent(Uri uri, Exception error, int sampleSize) {
        CropImage.ActivityResult result =
                new CropImage.ActivityResult(
                        mCropImageView.getImageUri(),
                        uri,
                        error,
                        mCropImageView.getCropPoints(),
                        mCropImageView.getCropRect(),
                        mCropImageView.getRotatedDegrees(),
                        mCropImageView.getWholeImageRect(),
                        sampleSize);
        Intent intent = new Intent();
        intent.putExtras(getIntent());
        intent.putExtra(CropImage.CROP_IMAGE_EXTRA_RESULT, result);
        return intent;
    }

    protected void rotateImage(int degrees) {
        mCropImageView.rotateImage(degrees);
    }

    @Override
    public void onSetImageUriComplete(CropImageView view, Uri uri, Exception error) {
        if (error == null) {
            if (mOptions.initialCropWindowRectangle != null) {
                mCropImageView.setCropRect(mOptions.initialCropWindowRectangle);
            }
            if (mOptions.initialRotation > -1) {
                mCropImageView.setRotatedDegrees(mOptions.initialRotation);
            }
        } else {
            setResult(null, error, 1);
        }
    }

    protected void cropImage() {
        if (mOptions.noOutputImage) {
            setResult(null, null, 1);
        } else {
            Uri outputUri = getOutputUri();
            mCropImageView.saveCroppedImageAsync(
                    outputUri,
                    mOptions.outputCompressFormat,
                    mOptions.outputCompressQuality,
                    mOptions.outputRequestWidth,
                    mOptions.outputRequestHeight,
                    mOptions.outputRequestSizeOptions);
        }
    }

    protected Uri getOutputUri() {
        Uri outputUri = mOptions.outputUri;
        if (outputUri == null || outputUri.equals(Uri.EMPTY)) {
            try {
                String ext =
                        mOptions.outputCompressFormat == Bitmap.CompressFormat.JPEG
                                ? ".jpg"
                                : mOptions.outputCompressFormat == Bitmap.CompressFormat.PNG ? ".png" : ".webp";
                outputUri = Uri.fromFile(File.createTempFile("cropped", ext, getCacheDir()));
            } catch (IOException e) {
                throw new RuntimeException("Failed to create temp file for output image", e);
            }
        }
        return outputUri;
    }

    @Override
    public void onCropImageComplete(CropImageView view, CropImageView.CropResult result) {
        setResult(result.getUri(), result.getError(), result.getSampleSize());
    }
}