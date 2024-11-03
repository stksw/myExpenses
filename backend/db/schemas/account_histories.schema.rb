create_table "account_histories", force: :cascade, charset: 'utf8mb4' do |t|
  t.references :bank_account
	t.date		 "recorded_at", null: false
  t.integer  "balance", null: false, renamed_from: "blance"
  t.string   "yearly"
  t.string   "monthly"

	t.timestamps
end