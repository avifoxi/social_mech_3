module PublicFiguresHelper

  # def label_template(display_text)
  #   html = '<a href="#"><i class="fa fa-minus-circle" data="toggle-active"></i></a> ' + display_text + ' <i class="fa fa-question-circle"></i>'
  #   html.html_safe
  # end

  def label_template( hash )
    expandable = hash[:expand] ? expand_contract_field_popover( hash[:expand] ) : ''
    q_n_a = question_n_answer_popover( hash[:q_n_a] )
    html = expandable + hash[:display_text] + q_n_a
    html.html_safe
  end

  def id_check_label(display_text, type)
    html = label_template(display_text)
    id_check =  ' <button data="test-username" type="' + type + '" class="btn btn-default btn-xs">Get Page ID</button></br>'
    html += id_check.html_safe
  end

  def question_n_answer_popover( q_n_a )
    wrap_with_popover( q_n_a, ' <i class="fa fa-question-circle"></i>' )
  end

  def expand_contract_field_popover( expand )
    wrap_with_popover( expand, ' <a href="#"><i class="fa fa-minus-circle" data="toggle-active"></i></a> ' )
  end

  def wrap_with_popover( hash, string_to_wrap )
    # title_placement_content_form_input
    html = '<span data-toggle="popover"' +
      ' title="' + hash[:title]  + '" ' +
      ' data-placement="' + hash[:placement] + '"' +
      'data-content="' + hash[:content]  + '"' +
      '>' + string_to_wrap +
      '</span>' 
    html.html_safe
  end


end
