class ContractsController < ApplicationController

  def index
    if_not_logged_in
    not_your_page_user_id_v
    @contracts = Contract.all
  end

  def show
    if_not_logged_in
    not_your_page_user_id_v
    if session[:user_id] != Contract.find_by_id(params[:id]).user.id
      redirect_to user_path(User.find_by_id(session[:user_id]), error_message: "that is not your data")
    end
    @contract = Contract.find_by_id(params[:id])
  end

  def new
    if_not_logged_in
    not_your_page_user_id_v
    if_error
    @contract = Contract.new
    @user_id = session[:user_id]
  end

  def create
    binding.pry
    @contract = Contract.create(contract_params)
    binding.pry
    redirect_to user_contract_path(@contract.user, @contract)
  end

  def edit
    if_not_logged_in
    not_your_page_user_id_v
    if session[:user_id] != Contract.find_by_id(params[:id]).user.id
      redirect_to user_path(User.find_by_id(session[:user_id]), error_message: "that is not your data")
    end
    if_error
    @contract = Contract.find_by_id(params[:id])
  end

  def update

  end

  def destroy

  end

  def contract_params
    params.require(:contract).permit(:length, :weekly_salary, :transfer_fee, :unusual_clauses, :status, :player_id, :club_id, :agent_id, :user_id)
  end

end
