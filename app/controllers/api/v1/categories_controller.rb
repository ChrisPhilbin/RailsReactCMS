class Api::V1::CategoriesController < ApplicationController

  before_action :authenticate_user!, only: [:create, :destroy]

  def create
    category = Category.create!(category_params)
    if category
      render json: category
    else
      render json: category.errors
    end
  end

  def index
    categories = Category.all
    if categories
      render json: categories
    else
      render json: categories.errors
    end
  end

  def show
    category = Category.find(params[:id])
    if category
      render json: {name: category.name, posts: category.posts}
    else
      render json: category.errors
    end
  end

  def destroy
    category&.destroy
    render json: {message: 'Category deleted!'}
  end

  def update
    category = Category.find(params[:id])
    category.update(name: params[:name])
    render json: category
  end
  
  private

    def category_params
        params.require(:category).permit(:name)
    end

  end
