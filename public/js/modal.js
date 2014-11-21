  <script type="text/ng-template" id="myModalContent.html">
        <div class="modal-header">
            <h3 class="modal-title">I'm a modal {{reponame}}!
        </div>
        <div class="modal-body">
            <ul>
                <li ng-repeat="log in logs">
                    <a ng-click="selected.log = log">{{ log }}</a>
                </li>
            </ul>
            Selected: <b>{{ selected.log }} {{repo.name}} {{size}} {{item.size}} {{item.name}}</b>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="ok()">OK</button>
            <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
        </div>
    </script>
