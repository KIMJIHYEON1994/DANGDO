package com.study.dangdospring.service;

import com.study.dangdospring.dto.ResponseDto;
import com.study.dangdospring.dto.SignInDto;
import com.study.dangdospring.dto.SignInResponseDto;
import com.study.dangdospring.dto.SignUpDto;

import com.study.dangdospring.entity.UserEntity;
import com.study.dangdospring.repository.UserRepository;
import com.study.dangdospring.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {

    private  PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired UserRepository userRepository;
    @Autowired TokenProvider tokenProvider;
    public ResponseDto<?> signUp(SignUpDto dto) {
        String userEmail = dto.getUserEmail();
        String userPwd = dto.getUserPwd();
        String userPwdChk = dto.getUserPwdChk();

        try {
            if (userRepository.existsById(userEmail))
                return ResponseDto.setFailed("Existed Email");
        } catch (Exception error) {
            return ResponseDto.setFailed("Data Base Error!");
        }
        if (!userPwd.equals(userPwdChk))
            return ResponseDto.setFailed("Password does not matched!");

        UserEntity userEntity = new UserEntity(dto);

        String encodedPwd = passwordEncoder.encode(userPwd);
        userEntity.setUserPwd(encodedPwd);

        try {
            userRepository.save(userEntity);
        } catch (Exception e) {
            return ResponseDto.setFailed("Data Base Error");
        }

        return ResponseDto.setSuccess("SignUp Success!", null);
    }
    public ResponseDto<SignInResponseDto> signIn(SignInDto dto) {
        String userEmail = dto.getUserEmail();
        String userPwd = dto.getUserPwd();
        
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserEmail(userEmail);
            if (userEntity == null) return ResponseDto.setFailed("Sign In Failed");

        } catch (Exception Error) {
            return ResponseDto.setFailed("Database Error");
        }

        userEntity.setUserPwd("");

        String token = tokenProvider.create(userEmail);
        int exprTime = 3600000;

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity);
        return ResponseDto.setSuccess("Sign In Success",signInResponseDto);

    }
}
