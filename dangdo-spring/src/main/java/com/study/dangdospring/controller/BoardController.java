package com.study.dangdospring.controller;

import com.study.dangdospring.dto.BoardDeleteDto;
import com.study.dangdospring.dto.BoardWriteDto;
import com.study.dangdospring.dto.ResponseDto;
import com.study.dangdospring.entity.BoardEntity;
import com.study.dangdospring.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired BoardService boardService;

    @PostMapping("/write")
    public ResponseDto<?> boardWrite(@RequestBody BoardWriteDto requestBody) {
        ResponseDto<?> result = boardService.boardWrite(requestBody);
        return result;
    }

    @GetMapping("/list")
    public ResponseDto<List<BoardEntity>> getList() {
        return boardService.getList();
    }

//    @GetMapping("/delete")
//    public ResponseDto boardDelete(Integer boardSeq) {
//        boardService.boardDelete(boardSeq);
//        return ResponseDto.set
//    }

    @GetMapping("/delete")
    public String deleteBoard(@RequestBody BoardDeleteDto requestBody) {
        boardService.deleteBoard(requestBody);
        return "redirect:/board";
}}
