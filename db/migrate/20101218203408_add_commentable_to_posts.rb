class AddCommentableToPosts < ActiveRecord::Migration
  def self.up
    add_column :posts, :commentable, :boolean
  end

  def self.down
    remove column :posts, :commentable
  end
end
