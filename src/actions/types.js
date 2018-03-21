const actionTypes = { 
  AUTH_USER: 'auth_user',  
	UNAUTH_USER:'unauth_user',
	AUTH_ERROR:'auth_error',
	SET_CURRENT_USER: 'SET_CURRENT_USER',
	PROTECTED_TEST: 'protected_test',
	GET_TEACHERS_CLASSES: 'get_teachers_classes',
	TOGGLE_CLASS_BUILDER_MODAL: 'toggle_class_builder_modal',
	ADD_NEW_CLASS_ACTION: 'add_class_action',
	GET_UPDATED_CLASS_LIST: 'get_updated_class_list',
	UPDATE_NEW_CLASS_NAME_ACTION: 'update_new_class_name_action',
	UPDATE_NEW_CLASS_SUBJECT_ACTION: 'update_new_class_subject_action',
	UPDATE_NEW_CLASS_QUARTER_ACTION: 'update_new_class_quarter_action',
	UPDATE_NEW_CLASS_YEAR_ACTION: 'update_new_class_year_action',
	////// StudentViewQuiz //////
	GET_QUIZ: 'get_quiz',
	NEXT_QUESTION: 'next_question',
	PREVIOUS_QUESTION: 'previous_question'

}

export default actionTypes