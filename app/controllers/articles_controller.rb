class ArticlesController < ApplicationController
  def index
    @articles = Article.order("id DESC")
    @article = Article.new
  end

  def new
  end

  def create
    article = Article.new(article_params)
    if article.save
      render json: article.to_json
    end
  end

  private
  def article_params
    params.permit(:text)
  end
end
