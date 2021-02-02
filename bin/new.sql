CREATE TABLE person (
    person_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(25) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address1 VARCHAR(50) NOT NULL,
    address2 VARCHAR(50) NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    addlnotes VARCHAR(5000) NULL,
    username varchar(20) NOT NULL,
    password varchar(2000) NOT NULL
    );

CREATE TABLE category (
    category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL
    );

CREATE TABLE item (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    itemname VARCHAR(50) NOT NULL,
    itemimage VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category_id INT NOT NULL,
    type_id INT NOT NULL,
    subcategory_1 VARCHAR(20) NULL,
    subcategory_2 VARCHAR(20) NULL,
    size VARCHAR(30) NOT NULL,
    typeprice DECIMAL(8,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (type_id) REFERENCES person(person_id) ON DELETE CASCADE ON UPDATE RESTRICT
    );

CREATE TABLE saleorder (
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    saledate DATE NOT NULL,
    customernotes VARCHAR(500),
    paymentstatus VARCHAR(10),
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE ON UPDATE RESTRICT
    );

CREATE TABLE orderdetail (
    orderdetail_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    saleprice DECIMAL(8,2) NOT NULL,
    qty INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES saleorder(order_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (item_id) REFERENCES item(item_id) ON DELETE CASCADE ON UPDATE RESTRICT
    );
    
CREATE TABLE shipping (
    shipping_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    orderdetail_id INT NOT NULL,
    shipped DATETIME NOT NULL,
    received DATETIME NOT NULL,
    sendernotestype VARCHAR(250) NOT NULL,
    receivernotestype VARCHAR(250) NOT NULL,
    FOREIGN KEY (orderdetail_id) REFERENCES orderdetail(orderdetail_id)
    ON DELETE CASCADE ON UPDATE RESTRICT
    );
    
CREATE TABLE review (
    review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    item_id INT NOT NULL,
    reviewdate DATE NOT NULL,
    comments VARCHAR(500),
    rating INT NOT NULL,
    status VARCHAR(10),
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (item_id) REFERENCES item(item_id) ON DELETE CASCADE ON UPDATE RESTRICT
    );

CREATE TABLE subscription (
    subscription_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    category_id INT NOT NULL,
    subscribedate DATE NOT NULL,
    unsubscribedate DATE NULL,
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE RESTRICT
    );

