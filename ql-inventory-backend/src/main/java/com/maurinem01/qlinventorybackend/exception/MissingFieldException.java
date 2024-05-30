package com.maurinem01.qlinventorybackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class MissingFieldException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * The name of the required field.
	 */
	private String fieldName;

	public MissingFieldException(String fieldName) {
		super(String.format("%s is required.", fieldName));
		this.fieldName = fieldName;
		System.out.println(String.format("%s is required.", fieldName));
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

}
