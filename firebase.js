var admin = require("firebase-admin");

var serviceAccount = require("./ecom-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ecom-d31e2.firebasestorage.app'
});
const bucket = admin.storage().bucket();
console.log('Bucket name:', bucket.name);

const uploadBase64ToFirebase = async (base64String, fileName) => {
    try {
        console.log('Starting upload to bucket:', bucket.name);

        // Remove header from base64 string if present
        const base64Image = base64String.replace(/^data:image\/\w+;base64,/, '');

        // Create buffer from base64
        const imageBuffer = Buffer.from(base64Image, 'base64');

        // Create a unique filename
        const uniqueFileName = `${Date.now()}-${fileName}`;
        const filePath = `images/${uniqueFileName}`;

        // Create reference to file in Firebase
        const file = bucket.file(filePath);

        // Upload the buffer
        await file.save(imageBuffer, {
            metadata: {
                contentType: 'image/png'
            }
        });

        // Generate a signed URL that expires in 10 years
        const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 315576000000 // 10 years in milliseconds
        });

        console.log('File uploaded successfully:', signedUrl);
        return signedUrl;

    } catch (error) {
        console.error('Detailed upload error:', error);
        throw error;
    }
};

// module.exports = uploadBase64ToFirebase;
