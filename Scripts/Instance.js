import { instanceFiles } from '../FileSystems/FileSystems.js';

// Penser à supprimer les valeurs une fois mis en prod
let envContent = "";
envContent += "###> DataBase parameters ###\n";
envContent += "DB_NAME=dragnreceive\n";
envContent += "DB_USER=root\n";
envContent += "DB_PASS=\n";
envContent += "DB_DIAL=mysql\n";
envContent += "DB_HOST=localhost\n";
envContent += "###< DataBase parameters ###\n\n";
envContent += "###> API Server parameters ###\n";
envContent += "PORT=3000\n";
envContent += "BASE_URL=http://localhost\n";
envContent += "SECRET_TOKEN=T0k3nD3G4m3r\n";
envContent += "###< API Server parameters ###\n";

instanceFiles(envContent);