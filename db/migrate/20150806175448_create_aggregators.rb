class CreateAggregators < ActiveRecord::Migration
  def change
    create_table :aggregators do |t|

      t.timestamps null: false
    end
  end
end
