class UsersController < ApplicationController

  def create
    User.create(user_params)
    render :nothing => true
  end

  private 

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
