package com.board.back.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.board.back.model.Board;

public interface BoardPagingAndSortingRepository extends PagingAndSortingRepository<Board, Long>{
	
	
	Page<Board> findAll(Pageable pageable);

	
}
