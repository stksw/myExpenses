create_table "bank_accounts", force: :cascade, charset: 'utf8mb4' do |t|
  	t.string   "bank_name", null: false
  	t.string   "branch", null: false
	t.string   "account_number", null: false, renamed_from: "number"
	t.string   "account_type", null: false, renamed_from: "type"
	t.string   "account_holder", null: false, renamed_from: "holder"
	t.integer  "balance", null: false, default: 0

	t.timestamps
end