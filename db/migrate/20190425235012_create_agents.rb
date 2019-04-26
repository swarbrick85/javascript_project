class CreateAgents < ActiveRecord::Migration[5.2]
  def change
    create_table :agents do |t|
      t.string :name
      t.string :country_of_origin
    end
  end
end