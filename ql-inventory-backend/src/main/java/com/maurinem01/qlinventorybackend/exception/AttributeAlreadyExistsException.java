package com.maurinem01.qlinventorybackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class AttributeAlreadyExistsException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		
	private String parentClassName;
	
	private Long parentClassId;
	
	/**
	 * Already existing attribute name
	 */
	private String childClassName;
	
	private Long childClassId;

	public AttributeAlreadyExistsException(String parentClassName, Long parentClassId, String childClassName, Long childClassId) {
		super(String.format("%s ID# %s already has an assigned %s ID# %s.", parentClassName, parentClassId, childClassName, childClassId));
		this.parentClassName = parentClassName;
		this.parentClassId = parentClassId;
		this.childClassName = childClassName;
		this.childClassId = childClassId;
	}

	public String getParentClassName() {
		return parentClassName;
	}

	public void setParentClassName(String parentClassName) {
		this.parentClassName = parentClassName;
	}

	public Long getParentClassId() {
		return parentClassId;
	}

	public void setParentClassId(Long parentClassId) {
		this.parentClassId = parentClassId;
	}

	public String getChildClassName() {
		return childClassName;
	}

	public void setChildClassName(String childClassName) {
		this.childClassName = childClassName;
	}

	public Long getChildClassId() {
		return childClassId;
	}

	public void setChildClassId(Long childClassId) {
		this.childClassId = childClassId;
	}
	
}
