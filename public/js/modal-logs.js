<!--beautify on save ausschalten sonst wird der code verhunzt = error -->
<script type="text/ng-template" id="modal-logs.html">
        <div class="modal-header">
            <h3 class="modal-title">Logs für {{id}}
        </div>
        <div class="modal-body">
            <p ng-repeat="log in logs|addbr track by $index">
                    {{ log }}
            </p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="ok()">OK</button>
            <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
        </div>
    </script>
