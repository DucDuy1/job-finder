package JobFinder.service;

import JobFinder.dto.SearchDto;
import JobFinder.dto.UserDto;
import JobFinder.dto.response.ListResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

public interface UserService {
    Long create(UserDto userDto, MultipartFile file, Principal principal) throws IOException;

    void download(String imageUrl, HttpServletResponse response) throws IOException;

    void update(UserDto userDto, MultipartFile file, Principal principal, String oldPassword) throws IOException;

    void delete(Long id);

    ListResponseDto<UserDto> search(SearchDto searchDto);

    ListResponseDto<UserDto> listUsers(Pageable pageable);

    UserDto getId(Long id);
}
