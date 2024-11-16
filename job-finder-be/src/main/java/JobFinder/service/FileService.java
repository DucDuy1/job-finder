package JobFinder.service;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    String uploadFile(MultipartFile file) throws IOException;

    void downloadFile(String imageUrl, HttpServletResponse response) throws IOException;

    Resource serveFile(String fileName);
}
