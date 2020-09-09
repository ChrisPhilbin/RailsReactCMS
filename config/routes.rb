Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get    'posts/index'
      get    'posts/latest'
      post   '/posts/create', to: 'posts#create'
      # post   'posts/create'
      get    '/show/:id',    to: 'posts#show'
      delete '/destroy/:id', to: 'posts#destroy'
      get    '/categories',  to: 'categories#index'
      get    '/categories/:id', to: 'categories#show'
      post   '/categories/create', to: 'categories#create'
      # patch '/edit/:id', to: 'posts#update'
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
