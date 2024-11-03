create_table "bank_accounts", force: :cascade, charset: 'utf8mb4' do |t|
  	t.string   "bank_name", null: false
  	t.string   "branch"
	t.string   "account_number", renamed_from: "number"
	t.string   "account_type", renamed_from: "type"
	t.string   "account_holder", null: false, renamed_from: "holder"
	t.integer  "balance", null: false, default: 0

	t.timestamps
end