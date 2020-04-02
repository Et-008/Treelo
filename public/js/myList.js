<% var List = board.boardList; %>
  <div class="ui card">
    <div class="content">
      <div class="header">My List</div>
    </div>
    <div class="content">
      <div class="ui small feed">
        <div class="event">
          <div class="content">
            <div class="summary">
              <% List.forEach(data) { %>
                <a>q<%= data %></a><br>
              <% }; %>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>