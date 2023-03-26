package com.study.dangdospring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SignInDto {
    // @NotBlank 넣어야 함
    private String userEmail;

    // @NotBlank 넣어야 함
    private String userPwd;
}
