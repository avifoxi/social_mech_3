module PublicFiguresHelper

  def label_template(display_text)
    html = '<a href="#"><i class="fa fa-minus-circle" data="toggle-active"></i></a> ' + display_text + ' <i class="fa fa-question-circle"></i>'
    html.html_safe
  end

  def id_check_label(display_text, type)
    html = label_template(display_text)
    id_check =  ' <button data="test-username" type="' + type + '" class="btn btn-default btn-xs">Get Page ID</button></br>'
    html += id_check.html_safe
  end

  def wrap_with_popover( hash )
    # title_placement_content_form_input
    html = '<div data-toggle="popover"' +
      ' title="' + hash[:title] + '" ' +
      ' data-placement="' + hash[:placement] + '"' +
      'data-content="' + hash[:pop_content]  + '"' +
      '>' + hash[:simple_form] + '</div>'
    html.html_safe
  end
end
