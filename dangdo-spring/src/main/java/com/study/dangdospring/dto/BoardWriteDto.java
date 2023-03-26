package com.study.dangdospring.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardWriteDto {
    private int boardSeq;
    private String boardTitle;
    private String boardContent;
    private String boardPrice;
    private int boardSort;
    private int boardLike;
    private String boardEmail;
    private String boardImg;
    private String boardVideo;
    private int boardCnt;
    private String boardDate;
}
