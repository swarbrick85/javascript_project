class AgentsController < ApplicationController
  before_action :authorization, except: [:create, :update]

  def index
    @agents = Agent.where(user_id: session[:user_id])
    respond_to do |f|
      f.html
      f.json {render json: @agents}
    end
  end

  def show
    if session[:user_id] != Agent.find_by_id(params[:id]).user.id
      redirect_to user_path(User.find_by_id(session[:user_id]), error_message: "that is not your data")
    end
    @agent = Agent.find_by_id(params[:id])
    respond_to do |f|
      f.html
      f.json {render json: @agent}
    end
  end

  def new
    @agent = Agent.new
  end

  def create
    @agent = Agent.new(agent_params)
    if @agent.save
      redirect_to user_agent_path(@agent.user, @agent)
    else
      render 'agents/new'
    end
  end

  def edit
    if session[:user_id] != Agent.find_by_id(params[:id]).user.id
      redirect_to user_path(User.find_by_id(session[:user_id]), error_message: "that is not your data")
    end
    @agent = Agent.find_by_id(params[:id])
  end

  def update
    @agent = Agent.find_by(user_id: params[:agent][:user_id], id: params[:agent][:id])
    if @agent.update(agent_params)
      redirect_to user_agent_path(@agent.user, @agent)
    else
      render 'agents/edit'
    end
  end

  def destroy
    @agent = Agent.find_by(user_id: params[:user_id], id: params[:id])
    @agent.delete
    redirect_to user_agents_path(User.find_by_id(session[:user_id]))
  end

  def agent_params
    params.require(:agent).permit(:name, :country_of_origin, :user_id, :id)
  end

end
