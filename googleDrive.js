const { google } = require('googleapis');
const path = require('path');
const stream = require('stream');

const KEYFILEPATH = path.join(__dirname, "ecom.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
let FOLDER_ID = ''; // We'll set this dynamically

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});

const createFolder = async (driveService) => {
    try {
        console.log('Creating new folder...');
        const fileMetadata = {
            name: 'Product Images',
            mimeType: 'application/vnd.google-apps.folder',
        };

        const file = await driveService.files.create({
            resource: fileMetadata,
            fields: 'id'
        });

        console.log('Created folder with ID:', file.data.id);
        return file.data.id;
    } catch (err) {
        console.error('Error creating folder:', err);
        throw err;
    }
};

const getOrCreateFolder = async (driveService) => {
    try {
        // First try to find an existing folder named "Product Images"
        const response = await driveService.files.list({
            q: "mimeType='application/vnd.google-apps.folder' and name='Product Images' and trashed=false",
            fields: 'files(id, name)',
            spaces: 'drive'
        });

        if (response.data.files.length > 0) {
            console.log('Found existing folder:', response.data.files[0].id);
            return response.data.files[0].id;
        }

        // If no folder found, create new one
        return await createFolder(driveService);
    } catch (error) {
        console.error('Error in getOrCreateFolder:', error);
        throw error;
    }
};

const uploadFile = async (fileObject) => {
    try {
        console.log('1. Starting authentication...');
        const client = await auth.getClient();
        console.log('2. Authentication successful');

        console.log('3. Initializing Drive service...');
        const driveService = google.drive({ version: 'v3', auth: client });
        console.log('4. Drive service initialized');

        // Get or create folder
        if (!FOLDER_ID) {
            console.log('5. Getting folder...');
            FOLDER_ID = await getOrCreateFolder(driveService);
            console.log('6. Using folder ID:', FOLDER_ID);
        }

        // Process the base64 string
        console.log('7. Processing file data...');
        const base64Data = fileObject.includes('data:image')
            ? fileObject.split(',')[1]
            : fileObject;

        console.log('8. Creating buffer...');
        const buffer = Buffer.from(base64Data, 'base64');
        console.log('9. Buffer created, size:', buffer.length);

        console.log('10. Creating stream...');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        console.log('11. Stream created');

        console.log('12. Starting file upload...');
        const { data } = await driveService.files.create({
            media: {
                mimeType: 'image/jpeg',
                body: bufferStream,
            },
            requestBody: {
                name: `product_${Date.now()}.jpg`,
                parents: [FOLDER_ID],
            },
            fields: "id,name",  // Simplified fields
        });

        console.log('13. Upload successful:', data);
        await makeFilePublic(driveService, data.id);

        // Generate a clean, direct-access URL
        const directUrl = `https://drive.google.com/uc?export=view&id=${data.id}`;
        console.log('Direct file URL:', directUrl);
        return directUrl;

    } catch (error) {
        console.error('Upload function error:', {
            message: error.message,
            stack: error.stack,
            code: error?.code,
            details: error?.errors
        });
        throw error;
    }
};
// Add this function after file upload
const makeFilePublic = async (driveService, fileId) => {
    try {
        let res = await driveService.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        console.log('File made public successfully');
    } catch (error) {
        console.error('Error making file public:', error);
        throw error;
    }
};




module.exports = uploadFile;