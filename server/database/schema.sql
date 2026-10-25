CREATE TABLE IF NOT EXISTS enquiries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    customer_type VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    monthly_bill VARCHAR(50),
    message TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'New'
        CHECK (status IN ('New', 'Contacted', 'Qualified', 'Converted', 'Closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);