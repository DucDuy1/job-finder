package JobFinder.service.impl;

import JobFinder.service.FileService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileServiceImpl implements FileService {
    private final Path fileStorageLocation = Paths.get("D:/FileDownLoad").toAbsolutePath().normalize();

    public FileServiceImpl() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create upload directory.", ex);
        }
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            if (fileName.contains("..")) {
                throw new RuntimeException("Invalid file path: " + fileName);
            }
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (Exception e) {
            System.err.println("File upload failed: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public void downloadFile(String fileName, HttpServletResponse response) throws IOException {
        // Tạo đường dẫn đến file cần tải xuống
        Path filePath = this.fileStorageLocation.resolve(fileName).normalize();

        // Kiểm tra file có tồn tại không
        if (Files.exists(filePath)) {
            // Thiết lập header để tải file
            response.setContentType(Files.probeContentType(filePath));
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

            // Copy nội dung file vào output stream của response
            Files.copy(filePath, response.getOutputStream());
            response.getOutputStream().flush(); // Đảm bảo dữ liệu được gửi đi
        } else {
            // Ném ngoại lệ nếu file không tìm thấy
            throw new RuntimeException("File not found: " + fileName);
        }
    }

    public Resource serveFile(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error serving file: " + e.getMessage());
        }
    }
}
