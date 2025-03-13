import "./TopHeader.css";

export default function TopHeader() {
    return (
        <div className="top-header">
            <p className="announcement">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <b><u>Shop Now</u></b>
            </p>
            <div className="language-selector">
                <select name="language" id="language">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                </select>
            </div>
        </div>
    );
}
