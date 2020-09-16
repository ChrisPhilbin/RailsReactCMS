class AddDefaultValueToCategoryColumn < ActiveRecord::Migration[6.0]
  def change
    change_column_default :posts, :category_id, default: 1
  end
end
