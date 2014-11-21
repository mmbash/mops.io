<!--beautify on save ausschalten sonst wird der code verhunzt = error -->
<script type="text/ng-template" id="modal-logs.html">
        <div class="modal-header">
            <h3 class="modal-title">Logs {{id}} {{logs}} {{containerlogs}}!
        </div>
        <div class="modal-body">
            <ul>
                <li ng-repeat="item in items">
                    <a ng-click="selected.item = item">{{ item }}</a>
                </li>
            </ul>
            Selected: <b>{{ selected.item }} {{repo.name}} {{size}} {{item.size}} {{item.name}}</b>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="ok()">OK</button>
            <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
        </div>
    </script>
