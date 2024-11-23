// pages/api/upload.ts
import { adminAuth, adminStorage, } from "@/utils";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const req = await request.json()
      const {  userId,customClaims = {} } = req;

// console.log(reque.file)

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

  try {

    // const { userId, customClaims = {} } = req.body;

    // Create a custom token with claims
    const customToken = await adminAuth.createCustomToken(userId, {
      ...customClaims,
      storageAccess: true, // Add custom claim for storage access
    });
    console.log(customToken)


    // Get Firebase Storage bucket
    // const bucket = adminStorage.bucket();
    // const imageArray = file.name.split(".");
    // imageArray[0] += Date.now();
    // const fname = imageArray.join(".");

    // Generate a unique filename
    // const fileName = `${rootFolder}/images/${fname}`;

    // console.log(file)

    // Create a file upload options object with metadata
    // const uploadOptions = {
    //   destination: fileName,
    //   metadata: {
    //     contentType: file.type || "application/octet-stream",
    //     metadata: {
    //       // Optional: add custom metadata
    //       originalName: file.name,
    //       uploadedBy: userId || "unknown",
    //     },
    //   },
    // };

    // Upload the file
    // const uploadResponse = await bucket.upload(file.path, uploadOptions);

    // console.log("uploadresult", uploadResponse);

    // Get the permanent public URL
    // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Generate a signed URL for the uploaded file
    // const [signedUrl] = await uploadResponse[0].getSignedUrl({
    //   version: "v4",
    //   action: "read",
    //   expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    // });

    // Return successful response
    return NextResponse.json(
      {
        message: "File uploaded successfully",
        customToken
        // fileName,
        // publicUrl: publicUrl, // Store this in your DB
        // signedUrl: signedUrl, // Use this for immediate access
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Upload error:", error?.message);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
