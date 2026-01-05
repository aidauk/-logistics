import * as bcrypt from 'bcryptjs';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { unlink } from 'fs';

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

export const ImageStorage = (destination: string) => {
  return {
    storage: diskStorage({
      destination: destination,
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        if (destination == './public/main-image') {
          return cb(null, `main.jpg`);
        } else {
          return cb(null, `${randomName}${extname(file.originalname)}`);
        }
      },
    }),
  };
};

export const deleteImage = (fullPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If the path is relative, you can convert it to an absolute path (optional):
    const filePath = join('server', '..', fullPath); // Ensure this leads to the correct absolute path
    unlink(filePath, (err) => {
      if (err) {
        return reject(err); // Deletion failed
      }
      resolve(); // Deletion succeeded
    });
  });
};
