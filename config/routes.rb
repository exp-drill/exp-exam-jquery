Rails.application.routes.draw do
  root 'articles#index'
  resources :articles
  resources :search, only: :index
end
