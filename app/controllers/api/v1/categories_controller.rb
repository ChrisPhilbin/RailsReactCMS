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
      render json: category
    else
      render json: category.errors
    end
  end

  def destroy
  
  end

  private

    def category_params
        params.require(:category).permit(:name)
    end

  end
