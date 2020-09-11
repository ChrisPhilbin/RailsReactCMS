class Api::V1::PostsController < ApplicationController

  before_action :authenticate_user!, only: [:create, :destroy]

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts
  end

  def latest
     posts = Post.last(5)
     if posts
       render json: posts
     else
      render json: posts.errors
     end
    end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    if post
      posted_by = User.find(post.user_id).email
      posted_in = Category.find(post.category_id).name
      render json: { post: post, posted_by: posted_by, posted_in: posted_in } 
    else
      render json: post.errors
    end
  end

  def destroy
    post&.destroy
    render json: {message: 'Post deleted!'}
  end

  def update
    post = Post.find(params[:id])
    post.update(title: params[:post][:title], body: params[:post][:body])
    render json: post
  end

  private

  def post_params
    params.permit(:title, :body, :user_id, :category_id)
  end

  def post
    @post ||= Post.find(params[:id])
  end

end
