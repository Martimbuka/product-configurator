var addButton = document.getElementById("addButton");
        var deleteButton = document.getElementById("deleteButton");

        addButton.addEventListener("click", function () {
            var specTable = document.querySelector(".spec-table");
            var newRow = document.createElement("div");
            newRow.classList.add("spec-table");
            newRow.innerHTML = `
                <div class="box frame-size">
                    <div class="sub-title">Размер на рамката</div>
                    <div class="sub">
                        <div class="sub-box width">Широчина</div>
                        <div class="sub-box height">Височина</div>
                        <div class="sub-box LB">LB, mm</div>
                        <div class="sub-box HB">HB, mm</div>
                        <input class="sub-box input-frame-size" type="text" name="frameSize" required>
                        <input class="sub-box input-frame-size" type="text" name="frameSize" required>
                    </div>
                </div>
                <div class="box opening-direction">
                    <div class="sub-title">Посока на отваряне</div>
                    <div class="sub">
                        <select class="sub-box">
                            <option value="навътре">Навътре</option>
                            <option value="навън">Навън</option>
                        </select>
                        <select class="sub-box">
                            <option value="дясна">Дясна</option>
                            <option value="лява">Лява</option>
                        </select>
                    </div>
                </div>
                <div class="box number-hinges">
                    <div class="sub-title">Брой панти</div>
                    <div class="sub">
                        <div class="sub-box two-hinges">2 панти</div>
                        <div class="sub-box three-hinges-or-more">3+ панти</div>
                        <div class="sub-box under-60">Врата ≤ 60kg</div>
                        <div class="sub-box above-60">Врата ≥ 60kg</div>
                        <input class="sub-box input-hinges" type="text" name="hingesNumber" min="1">
                        <input class="sub-box input-hinges" type="text" name="hingesNumber" min="1">
                    </div>
                </div>
                <div class="box wing">
                    <div class="sub-title">Крило</div>
                    <div class="sub">
                        <div class="info-wing">МДФ, грундиран</div>
                        <div class="required-wing">*задължително се добавя брава</div>
                        <select>
                            <option value="да">Да</option>
                            <option value="не">Не</option>
                        </select>
                    </div>
                </div>
                <div class="box lock-magnetic-counter">
                    <div class="sub-title">Брава с магнитен насрещник</div>
                    <div class="sub">
                        <select>
                            <option value="CB">CB</option>
                            <option value="PC">PC</option>
                            <option value="WC">WC</option>
                        </select>
                    </div>
                </div>
                <div class="box seal">
                    <div class="sub-title">Уплътнение</div>
                    <div class="sub">
                        <div class="color">Цвят</div>
                        <select>
                            <option value="бял">Бял</option>
                            <option value="сив">Сив</option>
                        </select>
                    </div>
                </div>
                <div class="box count">
                    <div class="sub-title">Количество</div>
                    <div class="sub">
                        <input type="number" name="quantity" min="1" required>
                    </div>
                </div>
                <div class="box delete-table">
                    <div id="deleteButton" class="delete-button">Изтрий</div>
                </div>
            `;
            specTable.parentNode.insertBefore(newRow, specTable.nextSibling);

            var deleteButtons = document.querySelectorAll(".delete-button");
            for (var i = 0; i < deleteButtons.length; i++) {
                var button = deleteButtons[i];
                button.addEventListener("click", function (event) {
                    event.target.parentElement.parentElement.remove();
                });
            }
        
        });